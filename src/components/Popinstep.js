import React, { useState } from 'react';

function Popinstep(props) {
    const [allBeers] = useState(props.autocomplete_beers);
    const [allMatchingBeers, setAllMatchingBeers] = useState([]);

    const handleChangeInput = (e) => {
        props.handleChangeInput(e);
        const newMatchingBeers = [];
        allBeers.forEach((element) => {
            if (element.includes(e.target.value)) {
                newMatchingBeers.push(element);
            }
        });
        if (e.target.value === '') {
            setAllMatchingBeers([]);
        } else {
            setAllMatchingBeers(newMatchingBeers);
        }
    }

    const handleSelectAutocomplete = (e) => {
        props.handleSelectAutocomplete(e);
        setAllMatchingBeers([]);
    }

    document.addEventListener('click', () => {
        setAllMatchingBeers([]);
    })

    if (props.autocomplete_beers) {
        return (
            <div className='popin-step'>
                <h3>{props.question}</h3>
                <input autoComplete="off" className='position-relative input' onChange={(e) => handleChangeInput(e)} value={props.val} name={props.name} />
                { allMatchingBeers !== [] &&
                    <div className='position-absolute autocomplete-group'>
                        {allMatchingBeers.slice(0, 5).map((beer) => {
                            return <p onClick={(e) => {handleSelectAutocomplete(e)}} className='autocomplete-element' key={beer}>{beer}</p> 
                        })}
                    </div>
                }
            </div>
        );
    } else {
        return (
            <div className='popin-step'>
                <h3>{props.question}</h3>
                { props.name === 'user_grade' &&
                    <div className='d-flex align-items-center justify-content-center'>
                        <span className="fs-30px mr-10px cpointer" onClick={props.handleLessButton}>-</span>
                        <input className='w-25' type='number' autoComplete="off" onChange={(e) => props.handleChangeInput(e)} value={props.val} name={props.name} />
                        <span className="fs-30px ml-10px cpointer" onClick={props.handlePlusButton}>+</span>
                    </div>
                }
                { props.name !== 'user_grade' &&
                    <input autoComplete="off" onChange={(e) => props.handleChangeInput(e)} value={props.val} name={props.name} />
                }
            </div>
        );
    }
}

export default Popinstep;