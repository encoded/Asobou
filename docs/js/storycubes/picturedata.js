//defines the data for a story cube picture:
//-ID (identification number to find data in text file)
//-ResourceUrl: actual image to be used.

class PictureData 
{
    constructor(uniqueID, url)
    {
        this.ID = uniqueID;
        this.resourceUrl = url;
    }
};

//group of picture (data); each picture is given its own ID;
class PictureDataGroup
{
    constructor()
    {
        this.arrayPicture = [];
        this.pictureCount = 0;
    }

    addPicture(url)
    {
        this.pictureCount++;
        let pictureData = new PictureData(this.pictureCount, url);
        this.arrayPicture.push(pictureData);
    }

    get getPictureArray()
    {
        return this.arrayPicture;
    }
};

let pictures = [
    'lock',
    'sad',
    'rainbow',
    'masks',
    'question_mark',
    'eye',
    'magnet_south',
    'world',
    'indicator',
    'license',
    'building',
    'walking_stick',
    'hand',
    'sleeping',
    'moon',
    'cube',
    'idea',
    'book',
    'parachute',
    'fountain',
    'piramid',
    'fish',
    'key',
    'card',
    'magnet_north',
    'happy',
    'phone',
    'sheep',
    'airplane',
    'weight_scale',
    'fear',
    'house',
    'bee',
    'scrabble',
    'conversation',
    'bridge',
    'flower',
    'tent',
    'tree',
    'directions',
    'star',
    'tower',
    'fire',
    'apple',
    'thunder',
    'foot',
    'lamp',
    'face',
    'search',
    'clock',
    'magic',
    'turtle',
    'arrow',
    'maths'
];