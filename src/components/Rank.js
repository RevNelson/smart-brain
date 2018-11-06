import React from 'react';

const Rank = ({name, entries}) => {
    return (
        <div>
            <div className='tc f3 link dim gray pa3'>
                <div>
                    {`${name}, your current entry count is...`}
                </div>
            </div>
            <div className='tc f1 link dim light-gray pa3'>
                <div>
                    {entries}
                </div>
            </div>
        </div>
    );
};

export default Rank;