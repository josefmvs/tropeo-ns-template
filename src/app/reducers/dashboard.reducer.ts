import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardState } from '../states/dashboard.state';
import { DashboardActionTypes, DashboardActions } from '../actions/dashboard.actions';

const initialState: DashboardState = {
	showLabel: true
};

const getItemFeature = createFeatureSelector<DashboardState>('activities');

//export const getShowLabel = createSelector(getItemFeature, (state) => state.showLabel);

export function dashboardReducer(state = initialState, action: DashboardActions) {
	switch (action.type) {
		case DashboardActionTypes.ToggleItemLabel1:
			console.log('Dashboard ToggleItemLabel reducer');
			return {
				state
				//...state,
				//showLabel: action.payload
			};
		case DashboardActionTypes.LoadingActivities:
			console.log('Dashboard LoadingActivities reducer');
			return {
				state
				//...state,
				//showLabel: action.payload
			};
		default:
			return {
				state
			};
	}
}
