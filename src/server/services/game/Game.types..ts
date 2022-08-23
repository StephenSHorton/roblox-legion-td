export type TeamLanes = {east: Lanes, west: Lanes}
export type Lanes = {NorthWest: LaneInfo, NorthEast: LaneInfo, SouthWest: LaneInfo, SouthEast: LaneInfo}
export type LaneInfo = {player?: Player, gold: number, lumber: number}

export const initLaneInfo = {gold: 0, lumber: 0}
export const initLanes: Lanes = {NorthEast: initLaneInfo, NorthWest: initLaneInfo, SouthEast: initLaneInfo, SouthWest: initLaneInfo}
export const initTeamLanes: TeamLanes = {east: initLanes, west: initLanes}