import { generalIconsActionsTypes } from './general-icons.type';


const INITIAL_STATE = {
    iconsMap: {},
    searchKeywordsList: [],
    categoryList: []
};

const generalIconsReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case generalIconsActionsTypes.FETCH_SEARCH_KEYWORD_AND_CATEGORY_LIST_SUCCESS:
            const { searchKeywordsList, categoryList } = action.payload;
            return { ...state, searchKeywordsList: [...searchKeywordsList], categoryList: [...categoryList] };
        default:
            return state;
    }
};

export default generalIconsReducer;