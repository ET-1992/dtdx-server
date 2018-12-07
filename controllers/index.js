const Category = require('../schema/category');
const Image = require('../schema/image');
const Group = require('../schema/group');


const getAll = async (ctx, next) => {
    let groupSqls = await Group.findAll();
    let promiseSb = [];
    let groups = [];

    groupSqls.forEach(async (item, index) => {

        const t = Category.findAll({
            where: {
                groupId: item.n_id
            }
        });
        promiseSb.push(t);
    });

    const s = await Promise.all(promiseSb);

    groupSqls.forEach((item, index) => {
        const { name, id, n_id } = item;
        groups.push({
            name,
            id,
            n_id,
            list: s[index]
        });
    });

    ctx.body = {
        groups
    };
};

const getCategoryAll = async (ctx, next) => {
    const { id } = ctx.query;
    console.log(id, 'id');
    const images = await Image.findAll({
        where: {
            categoryId: id
        }
    });
    ctx.body = images;
};

module.exports = {
    getAll,
    getCategoryAll
};