export type TeamLanes = {east: Lanes, west: Lanes}
export type Lanes = {northWest: LaneInfo, northEast: LaneInfo, southWest: LaneInfo, southEast: LaneInfo}
export type LaneInfo = {player?: Player, gold: number, lumber: number}

export const initLaneInfo = {gold: 0, lumber: 0}
export const initLanes: Lanes = {northEast: initLaneInfo, northWest: initLaneInfo, southEast: initLaneInfo, southWest: initLaneInfo}
export const initTeamLanes: TeamLanes = {east: initLanes, west: initLanes}

export const playerSetupOrder = ['northWest', 'southWest', 'northEast', 'southEast']