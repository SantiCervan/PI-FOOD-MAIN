import React from 'react'
import s from './styles/Paginated.module.css'

const Paginated = ({ recipesPerPage, recipes, paginate }) => {

    const pages = [];
    for (let i = 1; i <= Math.ceil(recipes / recipesPerPage); i++) {
        pages.push(i);
    }
    return (
        <div className={s.stylePaginated}>
            {
                pages && pages.map(num => (
                    <button className={s.styleButton} key={num} onClick={() => {
                        paginate(num);
                        window.scrollTo({
                            top: 0,
                            left: 0,
                            behavior: 'smooth'
                        })
                    }}>
                        {num}
                    </button>
                ))
            }
        </div>
    )
}

export default Paginated
