export interface AlarmParams {
  paging: number;
  type: string;
}

export interface Alarm {
  message: string;
  key: string;
  startTime: string;
}
