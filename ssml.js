'use strict';
module.exports = {
    'correct': function correct(ssmlString) {
        return ssmlString.replace(/&/g, 'und').replace(/\*/g, '');
    }
};
