import { Action } from '@ngrx/store';

export enum DashboardActionTypes {
	ToggleItemLabel1 = '[Item] Toggle Item Label',
	LoadingActivities = 'Loading Activities'
}

export class ToggleItemLabel1 implements Action {
	readonly type = DashboardActionTypes.ToggleItemLabel1;
	constructor(public payload: boolean) {
		console.log('Dashboard ToggleItemLabel1');
	}
}

export class LoadingActivities implements Action {
	readonly type = DashboardActionTypes.LoadingActivities;
	constructor(public payload: boolean) {
		console.log('Dashboard LoadingActivities');
	}
}

export type DashboardActions = ToggleItemLabel1 | LoadingActivities;

// import { Action } from "@ngrx/store";

// export enum DashboardActionTypes {
// 	LoadActivities = "[Item] Toggle Item Label"
// }

// export class LoadActivities implements Action {
//     console.log("load activities");
// 	readonly type = DashboardActionTypes.LoadActivities;
// 	 constructor(public payload: boolean) {}
// }

// export type DashboardActions = LoadActivities;
