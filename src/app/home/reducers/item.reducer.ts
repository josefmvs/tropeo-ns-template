import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ItemState } from "../states/item.state";
import { ItemActionTypes, ItemActions } from "../actions/item.actions";

const initialState: ItemState = {
    showLabel: true
};
const getItemFeature = createFeatureSelector<ItemState>("items");

export const getShowLabel = createSelector(
    getItemFeature,
    state => state.showLabel
);

export function itemReducer(state = initialState, action: ItemActions) {
    switch (action.type) {
        case ItemActionTypes.ToggleItemLabel:
            return {
                ...state,
                showLabel: action.payload
            };
        default:
            return {
                state
            };
    }
}
