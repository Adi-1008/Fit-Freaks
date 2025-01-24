import React from 'react'
import { IconCircleArrowUp } from '@tabler/icons-react';
import { IconCircleArrowDown } from '@tabler/icons-react';
import { useState } from 'react';

function Card({props}) {

    const [Arrow, setArrow] = useState(false)

    return (
        <div className={`flex flex-col overflow-hidden items-center justify-center relative rounded-xl bg-black text-white h-60`}>

            <span className="absolute pointer-events-none z-0 inset-[-10%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />

            <div className={`flex flex-col items-center justify-center absolute h-[98%] w-[98%] z-[1] bg-slate-900 rounded-xl`}>
                <div>
                    <span className='text-xl font-semibold'>Exercise :</span> {props.name}
                </div>
                <div>
                    <span className='text-xl font-semibold'>Equipment :</span> {props.equipment}
                </div>
                <div className={Arrow ? "flex flex-col rounded-xl justify-center w-full items-center bg-zinc-800 h-full absolute" : "flex"}>
                    <div className=' flex gap-3 items-center justify-center'>
                        <span className='text-xl font-semibold'> Instructions :</span>

                        <button onClick={() => { setArrow(false) }} className={Arrow ? "" : "hidden"}>
                            <IconCircleArrowDown stroke={2} />
                        </button>
                        <button onClick={() => { setArrow(true) }} className={Arrow ? "hidden" : ""}>
                            <IconCircleArrowUp stroke={2} />
                        </button>
                    </div>
                    <div className={Arrow ? "bg-zinc-800 p-3 w-full h-2/3 overflow-y-scroll" : "hidden"}>
                    <p>
                        {props.instructions}
                    </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
