import React, { useEffect, useState } from 'react';
import './Categories.css';
import axios from 'axios';
import { useCategory } from '../../context/Categorycontext';
import { useFilter } from '../../context/filterContext';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [nofCategoriestoshow, setNofCategoriestoShow] = useState(0);
    const {hotelCategory , sethotelCategory} = useCategory();
    const  {filterDispatch } = useFilter()

    const handleRightButton = () => {
        setNofCategoriestoShow(prev => prev + 10);
    };

    const handleLeftButton = () => {
        setNofCategoriestoShow(prev => prev - 10);
    };

    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await axios.get("http://localhost:4005/api/categories");
                const data = response.data;
                const categoriestoShow = data.slice(
                    nofCategoriestoshow + 10 > data.length ? data.length - 10 : nofCategoriestoshow,
                    nofCategoriestoshow > data.length ? data.length : nofCategoriestoshow + 10
                );
                setCategories(categoriestoShow);
            } catch (err) {
                console.log(err);
            }
        }
        fetchCategories();
    }, [nofCategoriestoshow]);

    const handleCategory = (category) => {
        sethotelCategory(category);
    };

    const handleFilterClick = () => {
        filterDispatch({
            type:"SHOW_FILTER_MODAL",
        })

    }

    return (
        <div>
            <section className='categories d-flex align-center gap-large cursor-pointer shadow'>
                {nofCategoriestoshow >= 10 && (
                    <button className="button btn-category btn-left fixed cursor-pointer" onClick={handleLeftButton}>
                        <span className="material-icons-outlined">arrow_left</span>
                    </button>
                )}
                {categories &&
                    categories.map(({ _id, category }) => (
                        <span className={`${category === hotelCategory ? " border-bottom" :  ""}`} key={_id} onClick={() => handleCategory(category)}>
                            {category}
                        </span>
                    ))}
                {nofCategoriestoshow - 10 < categories.length && (
                    <button className="button btn-category btn-right fixed cursor-pointer" onClick={handleRightButton}>
                        <span className="material-icons-outlined">arrow_right</span>
                    </button>
                )}
                <button className='button btn-filter d-flex align-center  gap-small cursor-pointer fixed' onClick={handleFilterClick}>
                    <span className='material-icons-outlined'>filter_alt</span>
                    <span>filter</span>
                </button>
            </section>
        </div>
    );
};

export default Categories;
