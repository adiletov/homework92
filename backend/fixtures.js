const mongoose = require('mongoose');
const nanoid = require('nanoid');
const User = require('./modules/User');
const Artist = require('./modules/Artist');
const Album = require('./modules/Album');
const Track = require('./modules/Track');

const config = require('./config');

const run = async () => {
    await mongoose.connect(config.database, config.options);
    const collections = await mongoose.connection.db.listCollections().toArray();

    for (let coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const users = await User.create(
        {fullName: 'Adil', username: 'admin', image: 'admin.png', password: 'admin123', role: 'admin', token : nanoid()},
        {fullName: 'Nurik',username: 'user', image: 'user.jpeg', password: 'user123', token: nanoid()}
    );


    const artists = await Artist.create(
        {name: 'Баста', image: 'basta.jpeg', published: true},
        {name: 'Guf', image: 'guf.jpeg', published: false},
        {name: 'Noggano', image: 'noggano.jpeg', published: false},
    );

    const albums = await Album.create(
        {title: 'Мама', artist: artists[0]._id, yearOfIssue: 2004, coverImage: 'bastaAlbum.jpeg', published: false},
        {title: 'Мастер и маргарита', artist: artists[0]._id, yearOfIssue: 2010, coverImage: 'bastaAlbum2.jpeg', published: true},
        {title: 'Guf умер', artist: artists[1]._id, yearOfIssue: 2014, coverImage: 'gufAlbum.jpeg', published: false},
        {title: 'Я к тебе', artist: artists[1]._id, yearOfIssue: 2008, coverImage: 'gufAlbum2.jpeg', published: false},
        {title: 'Живи красиво', artist: artists[2]._id, yearOfIssue: 2016, coverImage: 'nogganoAlbum.jpeg', published: false}
    );

    const tracks = await Track.create(
        {title: 'Мама', album: albums[0]._id, duration: '2:39', number: 3, href:"https://www.youtube.com/embed/_-pIVd4lGMw", published: false},
        {title: 'Моя игра', album: albums[0]._id, duration: '5:10', number: 2, href: 'https://www.youtube.com/embed/QAYdibGz0DU', published: false},
        {title: 'Брат', album: albums[0]._id, duration: '3:07', number: 1, href: 'https://www.youtube.com/embed/QcAtojepQss', published: false},
        {title: 'Гуф умер', album: albums[2]._id, duration: '4:08', number: 2, href: 'https://www.youtube.com/embed/nuJjc8GEp60', published: false},
        {title: 'Ice baby', album: albums[2]._id, duration: '4:37', number: 1, href: 'https://www.youtube.com/embed/kf70AU7ej5A', published: false},
        {title: 'Обнимала плечи', album: albums[3]._id, duration: '4:12', number: 4, href: 'https://www.youtube.com/embed/DwLjtMF-tqI', published: false},
        {title: 'Russian Paradise', album: albums[4]._id, duration: '3:21', number: 1, href: 'https://www.youtube.com/embed/tXEwTaXH5lk', published: false},
        {title: 'Жульбаны', album: albums[4]._id, duration: '3:21', number: 3, href: 'https://www.youtube.com/embed/BIPf-nHpZMA', published: false},
        {title: 'NO Passaran!!!', album: albums[4]._id, duration: '3:21', number: 2 , href: 'https://www.youtube.com/embed/6vF2RD-2bLY', published: false},
        {title: '100 строк', album: albums[2]._id, duration: '4:37', number: 2, href: 'https://www.youtube.com/embed/JzUw4UI5QQk', published: false},
        {title: '200 строк', album: albums[2]._id, duration: '4:12', number: 1, href: 'https://www.youtube.com/embed/uVVv3cTe41U', published: false},
        {title: 'Выпускной', album: albums[1]._id, duration: '3:21', number: 1, href: 'https://www.youtube.com/embed/woCjlrBBJko', published: false},
        {title: 'Районы', album: albums[3]._id, duration: '4:37', number: 2, href: 'https://www.youtube.com/embed/omtJk9ZVEuk', published: false},
        {title: 'Игра в стволы', album: albums[3]._id, duration: '4:12', number: 1, href: 'https://www.youtube.com/embed/JNWGlsw-m2k', published: false},
        {title: 'Тем Кто с Нами', album: albums[3]._id, duration: '3:21', number: 3, href: 'https://www.youtube.com/embed/eTlLyxerPWo', published: false}
    );
    await mongoose.connection.close()
};

run().catch(error => {
    console.error('Something went wrong' + error);
});