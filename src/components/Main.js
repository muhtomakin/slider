import React, { useState, useEffect } from 'react'
import Data from './Data'
import { ReactComponent as PrevIcon } from '../svgs/prev.svg'
import { ReactComponent as NextIcon } from '../svgs/next.svg'
import { ReactComponent as QuoteIcon } from '../svgs/quote.svg'


const Main = () => {

    const [people, setPeople] = useState(Data)
    const [index, setIndex] = useState(0)


    useEffect(() => {
        const lastIndex = people.length -1;
        if (index < 0) {
            setIndex(lastIndex);
        }
        if(index > lastIndex) {
            setIndex(0);
        }
    }, [index, people]);

    useEffect(() => {
        let slider = setInterval(() => {
            setIndex(index + 1);
        }, 10000);
        return () => {
            clearInterval(slider);
        };
    }, [index]);

    return (
        <section className='section'>
            <div className='title'>
                <h2>
                    <span>/</span>
                    reviews
                </h2>
            </div>
            <div className='sectionCenter'>
                {people.map((person, personIndex) => {

                    let position = 'nextSlide';

                    if (personIndex === index) {
                        position = 'activeSlide';
                    }
                    if (personIndex === index -1 || (index === 0 && personIndex === people.length -1)) {
                        position = 'lastSlide';
                    }
                    
                    return (
                        <article className={position} key={person.id} >
                            <img className='personImg' src={person.img} alt={person.name} />
                            <h4>{person.name}</h4>
                            <p className='title'>{person.job}</p>
                            <p className='desc'>{person.description}</p>
                            <QuoteIcon  className='icon' />
                        </article>
                    );
                })}
                
                <button onClick={() => setIndex(index - 1)} className='prev'>
                    <PrevIcon />
                </button>
                <button onClick={() => setIndex(index + 1)} className='next'>
                    <NextIcon />
                </button>
            </div>
        </section>
    )
}

export default Main
