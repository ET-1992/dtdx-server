const Category = require('../schema/category');
const Image = require('../schema/image');
const Group = require('../schema/group');

const axios = require('axios');
const fs = require('fs');
const path = require('path');

const db = require('../config/db');
const sequelize  =  db.sequelize;
const Op = sequelize.Op;

// Category.hasMany(Image);
// Image.belongsTo(Category);

// sequelize.sync({ force: true });

async function initImage() {
    // const category = await Category.create({ 'name': 'test1' });
    // const image = await Image.create({ 'url': 'fddfdfdfdf1' });
    // await category.addImage(image);



    const imgRootPath = path.join(__dirname, '../public/biaoqing');

    function find(rootPath, directory, CategoryData) {
        const files = fs.readdirSync(rootPath);
        console.log(files, 'files');
        files.forEach((item, index) => {

            const imgPath = path.join(rootPath, item);
            fs.stat(imgPath, async (err, stats) => {
                if (err) {
                    console.log(err);
                }
                // let category;

                try {
                    if (stats.isDirectory()) {
                        const Categorys = await Category.findOne({
                            'where': {
                                'n_id': item
                            }
                        });
                        console.log(Categorys);

                        // let CategoryData = '';

                        if (!Categorys) {
                            await Category.create({ 'n_id': item });
                        }
                        find(imgPath, item);

                    }

                    if (stats.isFile()) {
                        const images = await Image.findOne({
                            where: {
                                categoryId: directory
                            }
                        });
                        if (!images) {
                            const index = imgPath.indexOf('biaoqing');
                            const _imgPath = imgPath.substring(index);
                            await Image.create({ 'url': _imgPath, 'categoryId': directory });
                        }
                    }
                } catch (e) {
                    console.log(e, 'e');
                }
            });
        });
    }

    find(imgRootPath);
}

// Group.hasMany(Category);
// Category.belongsTo(Group);

// Category.sync({ alter: true });

// Group.sync({ force: true });

async function initGroup() {

    const groupUrl = 'https://emoji.biaoqingcangku.com/tp5/public/wxapp/group/all';
    const f_data = await axios.get(groupUrl);

    console.log(f_data);

    const { data: { data: { group }}} = f_data;

    console.log(group);

    group.forEach(async (item, index) => {
        const { id, name, list } = item;
        const groupSql = await Group.findOne({
            'where': {
                n_id: id
            }
        });

        if (!groupSql) {
            await Group.create({
                'n_id': id,
                'name': name
            });
        }

        list.forEach(async (listItem) => {
            const { id, name, url } = listItem;

            const categorySql = await Category.findOne({
                'where': {
                    n_id: id
                }
            });

            if (categorySql) {
                categorySql.name = name;
                categorySql.url = url;
                categorySql.groupId = item.id;
                await categorySql.save();
            }
        });
    });
}

async function updateImageUrl() {
    const images = await Image.findAll({
        'where': {
            'url': {
                [Op.like]: '%\\\\%'
            }
        }
    });
    images.forEach(async (item) => {
        // const index = item.url.indexOf('biaoqing');
        // item.url = item.url.substring(index);
        item.url = item.url.replace(/\\/g, '/');
        console.log(item.url, 'images');
        // await item.save();
    });
}

async function initCategory() {
    const categoryRootPath = path.join(__dirname, '../public/biaoqing/category');
    const categorys = await Category.findAll();
    categorys.forEach((item) => {
        console.log(item.get({ 'plain': true }), 'item');
        console.log(item.url, 'url');
        if (item.url) {
            axios({
                method: 'get',
                url: item.get({ 'plain': true }).url.replace('https:', 'http:'),
                responseType: 'stream'
            }).then((res) => {
                res.data.pipe(fs.createWriteStream(path.join(categoryRootPath, `./${item.id}.gif`)));
            });
        }
    });
}

async function updateCategory() {
    const categoryRootPath = path.join(__dirname, '../public/biaoqing/category');
    const categorys = await Category.findAll();
    categorys.forEach((item) => {
        if (item.url) {
            item.url = 'www.pengfeidie.com/biaoqing/category/' + item.id + '.gif';
            item.save();
        }
    });
}

module.exports = {
    initGroup,
    initImage,
    updateImageUrl,
    initCategory,
    updateCategory
};