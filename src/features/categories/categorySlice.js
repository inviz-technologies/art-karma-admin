import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'



export const getCategorysContent = createAsyncThunk('/categorys/content', async () => {
	const response = await axios.get('/api/users?page=2', {})
	return response.data;
})

export const categorysSlice = createSlice({
    name: 'categorys',
    initialState: {
        isLoading: false,
        categorys : []
    },
    reducers: {


        addNewCategory: (state, action) => {
            let {newCategoryObj} = action.payload
            state.categorys = [...state.categorys, newCategoryObj]
        },

        deleteCategory: (state, action) => {
            let {index} = action.payload
            state.categorys.splice(index, 1)
        }
    },

    extraReducers: {
		[getCategorysContent.pending]: state => {
			state.isLoading = true
		},
		[getCategorysContent.fulfilled]: (state, action) => {
			state.categorys = action.payload.data
			state.isLoading = false
		},
		[getCategorysContent.rejected]: state => {
			state.isLoading = false
		},
    }
})

export const { addNewCategory, deleteCategory } = categorysSlice.actions

export default categorysSlice.reducer