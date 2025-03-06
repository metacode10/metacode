using IL6152_WEB_FTMS_REST.Common;
using IL6152_WEB_FTMS_REST.Models;
using System;
using System.Collections;
using System.Linq;
using System.Collections.Generic;
using System.Net.Http;
using System.Web.Http;
using IntraLogis;
using System.Diagnostics;
using DevExpress.Xpo;
using System.Threading.Tasks;
using System.Web;
using System.Text.RegularExpressions;

namespace IL6152_WEB_FTMS_REST.Controllers
{
    public class UserController : ApplicationController
    {
        private static readonly log4net.ILog _logger = log4net.LogManager.GetLogger(typeof(UserController));
        private readonly ReturnHandler _returnHandler = new();
        private readonly Messages _messages = new();

        [HttpPost]
        public async Task<HttpResponseMessage> Authentication([FromBody] RequestUserModel request)
        {
            var response = new ResponseUserModel();
            var log = new Log();
            var allowedPositions = Common.Common.GetIpAddress();
            var allowedPositionsString = string.Join(";", allowedPositions.Cast<string>());

            try
            {
                _logger.Debug("[Restful Ver. 6 Login --------------->");

                ValidateRequest(request);
                
                var (userKey, errorCode, errorText) = await AuthenticateUser(request, allowedPositionsString);
                var session = await GetUserSession(userKey);
                response = await GetLoginInfo(session, userKey, request.UserID, allowedPositions);

                log.SetLog(Request, request, response, AppSettings.ServiceUrl, allowedPositionsString, response.UserData?.Type ?? 0);
            }
            catch (AppException ex)
            {
                _logger.Error(ex.Message, ex);
                response = CreateErrorResponse(ex.ErrCode);
                log.SetLog(Request, request, response, AppSettings.ServiceUrl, allowedPositionsString, 0);
            }
            catch (Exception ex)
            {
                _logger.Error(ex.Message, ex);
                response = CreateErrorResponse(5);
                log.SetLog(Request, request, response, AppSettings.ServiceUrl, allowedPositionsString, 0);
            }

            return _returnHandler.ReturnCommon(response);
        }

        private void ValidateRequest(RequestUserModel request)
        {
            if (request == null)
                throw new AppException(1, "1");

            if (string.IsNullOrWhiteSpace(request.UserID) || 
                string.IsNullOrWhiteSpace(request.Password) || 
                string.IsNullOrWhiteSpace(AppSettings.SiteName) || 
                string.IsNullOrWhiteSpace(AppSettings.ServiceUrl))
                throw new AppException(2, "2");
        }

        private async Task<(string userKey, int errorCode, string errorText)> AuthenticateUser(
            RequestUserModel request, 
            string allowedPositions)
        {
            var client = new Client
            {
                URL = AppSettings.ServiceUrl,
                Timeout = 8
            };

            _logger.Debug($"ID: {request.UserID.ToUpper()} 사용자 Login API 사용하여 로그인 시도");

            try
            {
                client.Login(
                    out string userKey,
                    out int errorCode,
                    out string errorText,
                    AppSettings.SiteName,
                    request.UserID.ToUpper(),
                    Lib.EncryptPassword(request.Password),
                    "RESTful API - Login(ID/PW)",
                    0,
                    (int)LoginType.System,
                    string.Empty,
                    string.Empty);

                if (errorCode != 0)
                    throw new AppException(11, "11");

                return (userKey, errorCode, errorText);
            }
            catch
            {
                throw new AppException(11, "11");
            }
        }

        private async Task<Session> GetUserSession(string userKey)
        {
            try
            {
                return GetSiteXPOSession(userKey, AppSettings.ServiceUrl);
            }
            catch
            {
                throw new AppException(15, "15");
            }
        }

        private async Task<ResponseUserModel> GetLoginInfo(
            Session session,
            string userKey,
            string userId,
            ArrayList allowedPositions)
        {
            using var stopwatch = new Stopwatch();
            stopwatch.Start();

            LoginUserInfo userInfo;
            using (var login = new LoginProcessor())
            {
                userInfo = login.GetUserInfo(session, userKey, AppSettings.ServiceUrl, userId);
            }

            if (userInfo == null)
                throw new AppException(16, "16");

            stopwatch.Stop();
            _logger.Debug($"Restful Login Elapsed ---------------> {stopwatch.Elapsed.TotalSeconds}초 {stopwatch.Elapsed}");

            ValidateUserPositions(userInfo.AllowedPosition, allowedPositions);
            ValidateUserType(userInfo.Type);

            return CreateSuccessResponse(userId, userInfo, userKey);
        }

        private void ValidateUserPositions(string userPositions, ArrayList allowedPositions)
        {
            if (string.IsNullOrWhiteSpace(userPositions))
                return;

            var positions = userPositions.TrimEnd(';').Split(';');
            var allowedSet = new HashSet<string>(allowedPositions.Cast<string>());

            if (!positions.Any(allowedSet.Contains))
                throw new AppException(12, "12");
        }

        private void ValidateUserType(int userType)
        {
            if (userType != (int)UserType.API)
                throw new AppException(13, "13");
        }

        private static ResponseUserModel CreateSuccessResponse(string userId, LoginUserInfo userInfo, string userKey)
        {
            return new ResponseUserModel
            {
                Code = 0,
                Message = string.Empty,
                UserData = new UserData
                {
                    ID = userId,
                    Name = userInfo.Name,
                    UserKey = userKey,
                    ExpireDate = userInfo.Entered
                }
            };
        }

        private ResponseUserModel CreateErrorResponse(int errorCode)
        {
            return new ResponseUserModel
            {
                Code = errorCode,
                Message = _messages.getErrorMessage(errorCode),
                UserData = null
            };
        }

        /// <summary>
        /// IP 주소를 검증하고 ArrayList에 추가합니다.
        /// </summary>
        /// <param name="ipList">IP 주소를 저장할 ArrayList</param>
        /// <param name="ip">검증할 IP 주소</param>
        public static void AddIP(ArrayList ipList, string ip)
        {
            if (ipList == null || string.IsNullOrWhiteSpace(ip))
                return;

            var trimmedIp = ip.Trim();
            if (!IsValidIpAddress(trimmedIp))
                return;

            if (!ipList.Contains(trimmedIp))
                ipList.Add(trimmedIp);
        }

        /// <summary>
        /// IP 주소가 유효한지 검증합니다.
        /// </summary>
        private static bool IsValidIpAddress(string ip)
        {
            const string pattern = @"^(25[0-5]|2[0-4]\d|[01]?\d?\d)(\.(25[0-5]|2[0-4]\d|[01]?\d?\d)){3}$";
            return Regex.IsMatch(ip, pattern);
        }

        public static ArrayList GetIpAddress()
        {
            var ipAddresses = new ArrayList();
            
            try
            {
                var request = HttpContext.Current?.Request;
                if (request == null)
                    return ipAddresses;

                // X-Forwarded-For 헤더 확인 (프록시 서버를 통한 요청)
                var forwardedFor = request.Headers["X-Forwarded-For"];
                if (!string.IsNullOrEmpty(forwardedFor))
                {
                    var ips = forwardedFor.Split(',')
                        .Select(ip => ip.Trim())
                        .Where(ip => !string.IsNullOrEmpty(ip));
                    
                    foreach (var ip in ips)
                    {
                        if (!ipAddresses.Contains(ip))
                            ipAddresses.Add(ip);
                    }
                }

                // X-Real-IP 헤더 확인
                var realIp = request.Headers["X-Real-IP"];
                if (!string.IsNullOrEmpty(realIp) && !ipAddresses.Contains(realIp))
                {
                    ipAddresses.Add(realIp);
                }

                // HTTP_CLIENT_IP 헤더 확인
                var clientIp = request.ServerVariables["HTTP_CLIENT_IP"];
                if (!string.IsNullOrEmpty(clientIp) && !ipAddresses.Contains(clientIp))
                {
                    ipAddresses.Add(clientIp);
                }

                // HTTP_X_FORWARDED_FOR 헤더 확인
                var httpForwardedFor = request.ServerVariables["HTTP_X_FORWARDED_FOR"];
                if (!string.IsNullOrEmpty(httpForwardedFor))
                {
                    var ips = httpForwardedFor.Split(',')
                        .Select(ip => ip.Trim())
                        .Where(ip => !string.IsNullOrEmpty(ip));
                    
                    foreach (var ip in ips)
                    {
                        if (!ipAddresses.Contains(ip))
                            ipAddresses.Add(ip);
                    }
                }

                // RemoteAddr 확인 (마지막 수단)
                var remoteAddr = request.ServerVariables["REMOTE_ADDR"];
                if (!string.IsNullOrEmpty(remoteAddr) && !ipAddresses.Contains(remoteAddr))
                {
                    ipAddresses.Add(remoteAddr);
                }

                // 로컬 IP 주소 추가 (개발 환경용)
                var localIp = request.ServerVariables["LOCAL_ADDR"];
                if (!string.IsNullOrEmpty(localIp) && !ipAddresses.Contains(localIp))
                {
                    ipAddresses.Add(localIp);
                }
            }
            catch (Exception ex)
            {
                // 로깅 추가
                log4net.LogManager.GetLogger(typeof(UserController)).Error("Error getting IP address", ex);
            }

            return ipAddresses;
        }
    }
}