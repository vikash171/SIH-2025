/**
 * Rank Component
 * 
 * Purpose: Individual rank item displaying user's position, name, and avatar
 * Parent Component: Leaderboard.jsx
 * 
 * Features:
 * - Shows rank number, name, and avatar
 * - Highlights current user with special styling
 * - Clean, consistent design for leaderboard entries
 * - Optional additional info (XP, school, country)
 */

const Rank = ({
    rank,
    name,
    avatar,
    xp = null,
    school = null,
    country = null,
    badge = null,
    isCurrentUser = false,
    onClick = null
}) => {

    const getAvatarGradient = () => {
        // Different gradients based on rank
        if (rank === 1) return 'from-yellow-400 to-orange-500';
        if (rank === 2) return 'from-gray-400 to-gray-500';
        if (rank === 3) return 'from-orange-400 to-red-500';
        return 'from-blue-400 to-purple-500';
    };

    const getRankStyle = () => {
        if (rank === 1) return 'text-yellow-600 font-bold text-xl';
        if (rank === 2) return 'text-gray-600 font-bold text-xl';
        if (rank === 3) return 'text-orange-600 font-bold text-xl';
        return 'theme-text font-bold text-lg';
    };

    return (
        <div
            className={`flex items-center space-x-4 p-4 rounded-xl transition-all hover:shadow-md ${isCurrentUser
                    ? 'bg-yellow-50 border-2 border-yellow-200 shadow-sm'
                    : 'theme-card hover:bg-gray-50'
                } ${onClick ? 'cursor-pointer' : ''}`}
            onClick={onClick}
        >
            {/* Rank Number */}
            <div className="flex items-center justify-center w-12">
                <span className={getRankStyle()}>#{rank}</span>
            </div>

            {/* Country Flag (if provided) */}
            {country && (
                <span className="text-xl">{country}</span>
            )}

            {/* Avatar */}
            <div className={`w-12 h-12 bg-gradient-to-r ${getAvatarGradient()} rounded-full flex items-center justify-center shadow-sm ${isCurrentUser ? 'ring-2 ring-yellow-400' : ''
                }`}>
                <span className="text-white font-bold text-sm">{avatar}</span>
            </div>

            {/* User Info */}
            <div className="flex-1">
                <div className="flex items-center space-x-2">
                    <p className={`font-semibold ${isCurrentUser ? 'theme-text' : 'theme-text'}`}>
                        {name}
                        {isCurrentUser && <span className="text-yellow-600 ml-1">(You)</span>}
                    </p>
                    {badge && <span className="text-lg">{badge}</span>}
                </div>

                {/* Additional Info */}
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                    {school && <span>{school}</span>}
                    {xp && <span>{xp.toLocaleString()} XP</span>}
                </div>
            </div>

            {/* Special Indicator for Current User */}
            {isCurrentUser && (
                <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-yellow-600 font-medium">YOU</span>
                </div>
            )}
        </div>
    );
};

export default Rank;