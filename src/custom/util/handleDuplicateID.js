// @flow

const handleDuplicateID = (id) => {
    const newID = id === 'building' ?
        `tn-${id}-${Math.floor(Math.random() * 10000) + 1}` :
        id;
    return newID;
};

export default handleDuplicateID;
