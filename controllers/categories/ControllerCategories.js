const ModelCategory = require('./ModelCategory');

//getcate
const getCategories = async (page, limit, keyword) => {
    try {
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        let skip = (page - 1) * limit;
        let sort = { create_at: -1 };// 1: tăng dần, -1: giảm dần
        // query : điều kiện tìm kiếm
        let query = {};// nếu là 1 object rõng là không có điều kiện tìm kiếm
        query = {
            ...query,

        }


        let categories = ModelCategory
            .find(query)
            // Bỏ qua bao nhiêu sản phẩm
            .skip(skip)
            // Giới hạn số lượng sản phẩm 
            .limit(limit)
            // Sắp xếp theo thời gian tạo
            .sort(sort);

        return categories;

    } catch (error) {
        console.log('Lấy danh sách sản phẩm lỗi: ', error);
        throw new Error('Lấy danh sách sản phẩm lỗi');
    }
}



const addcate = async (name, brand, image) => {
    try {
        const newCate = new ModelCategory({
            name,
            brand,
            image,
            create_at: Date.now(),
            update_at: Date.now()
        })
        let result = await newCate.save();
        return result;
    } catch (error) {
        console.log('Thêm danh sách sản phẩm lỗi: ', error);
        throw new Error('Thêm danh sách sản phẩm lỗi');
    }
}

const updateCate = async (id, name, brand, image) => {
    try {
        const updatedCate = await ModelCategory.findByIdAndUpdate(
            id,
            {
                name,
                brand,
                image,
                update_at: Date.now()
            })

        if (!updatedCate) throw new Error('Danh mục không tồn tại');
        return updatedCate;
    } catch (error) {
        console.log('Chỉnh sửa danh sách sản phẩm lỗi: ', error);
        throw new Error('Chỉnh sửa danh sách sản phẩm lỗi');
    }
};

const deleteCate = async (idCate) => {
    try {
        const CateInDB = ModelCategory.findById(idCate);
        if (!CateInDB) {
            throw new Error('Nhãn hàng không tồn tại');
        }

        let result = ModelCategory.findByIdAndDelete(idCate);
        return result;
    } catch (error) {
        console.log('Xóa danh sách lỗi', error);
        throw new Error('Xóa danh sách lỗi');
    }
}

module.exports = { getCategories, addcate, deleteCate, updateCate }