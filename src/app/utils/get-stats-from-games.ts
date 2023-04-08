import { Game, Stats, Team } from '../data.models';

export function getStatsFromGames(team: Team) {
  return (games: Game[]): Stats => {
    const stats: Stats = {
      wins: 0,
      losses: 0,
      averagePointsScored: 0,
      averagePointsConceded: 0,
      lastGames: [],
    };
    games.forEach(game => {
      const gameStats = getSingleGameStats(team, game);
      stats.wins += gameStats.wins;
      stats.losses += gameStats.losses;
      stats.averagePointsConceded += gameStats.averagePointsConceded;
      stats.averagePointsScored += gameStats.averagePointsScored;
      stats.lastGames.push(gameStats.wins == 1 ? 'W' : 'L');
    });
    stats.averagePointsScored = Math.round(
      stats.averagePointsScored / games.length
    );
    stats.averagePointsConceded = Math.round(
      stats.averagePointsConceded / games.length
    );
    return stats;
  };
}

function getSingleGameStats(team: Team, game: Game): Stats {
  const stats: Stats = {
    wins: 0,
    losses: 0,
    averagePointsScored: 0,
    averagePointsConceded: 0,
    lastGames: [],
  };
  if (game.home_team.id === team.id) {
    stats.averagePointsScored = game.home_team_score;
    stats.averagePointsConceded = game.visitor_team_score;
    if (game.home_team_score > game.visitor_team_score) {
      stats.wins += 1;
    } else {
      stats.losses += 1;
    }
  }
  if (game.visitor_team.id === team.id) {
    stats.averagePointsScored = game.visitor_team_score;
    stats.averagePointsConceded = game.home_team_score;
    if (game.visitor_team_score > game.home_team_score) {
      stats.wins = 1;
    } else {
      stats.losses = 1;
    }
  }
  return stats;
}
