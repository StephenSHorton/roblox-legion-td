export type TeamLanes = {East: Lanes, West: Lanes}
export type Lanes = {NorthWest: LaneInfo, NorthEast: LaneInfo, SouthWest: LaneInfo, SouthEast: LaneInfo}
export type LaneInfo = {player?: Player, gold: number, lumber: number}

export const initTeamLanes = {East: {NorthEast: {gold: 0, lumber: 0}, NorthWest: {gold: 0, lumber: 0}, SouthEast: {gold: 0, lumber: 0}, SouthWest: {gold: 0, lumber: 0}}, West: {NorthEast: {gold: 0, lumber: 0}, NorthWest: {gold: 0, lumber: 0}, SouthEast: {gold: 0, lumber: 0}, SouthWest: {gold: 0, lumber: 0}}}
