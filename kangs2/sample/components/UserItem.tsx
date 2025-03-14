import { User } from '../types/user';

interface UserItemProps {
  user: User;
  onClick?: (user: User) => void;
}

export const UserItem = ({ user, onClick }: UserItemProps) => {
  const handleClick = () => {
    onClick?.(user);
  };

  return (
    <div 
      role="listitem"
      onClick={handleClick}
      className={`
        p-3 bg-white rounded-lg shadow-sm border border-gray-200 
        hover:shadow-md transition-all duration-200 cursor-pointer
        ${onClick ? 'hover:bg-gray-50' : ''}
      `}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="font-medium text-gray-900">{user.id}</span>
          <span className="text-gray-400">:</span>
          <span className="text-gray-700">{user.name}</span>
        </div>
        {onClick && (
          <span className="text-sm text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
            상세보기 →
          </span>
        )}
      </div>
    </div>
  );
};