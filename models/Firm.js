// const mongoose = require('mongoose');
// const firmSchema=new mongoose.Schema({
//     firmName:{
//         type:String,
//         required:true,
//         unique:true
//     },
//     area:{
//         type:String,
//         required:true,

//     },
//     category:{
//         type:[
//             {
//                 type:String,
//                 enum:['veg','non-veg']
//             }
//         ]
//     },
//     region:{
//         type:[
//             {
//                 type:['south-Indian','north-Indian','chineese','bakery']
//             }
//         ]
//     },
//     offer:{
//         type:String,
//     },
//     image:{
//         type:String,
//     },
//     vendor:[{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:'vendor'

//     }]
// });
// const Firm=mangoose.model('Firm',firmSchema);
// module.exports=Firm;

const mongoose = require('mongoose');

const firmSchema = new mongoose.Schema({
    firmName: {
        type: String,
        required: true,
        unique: true
    },
    area: {
        type: String,
        required: true,
    },
    category: [
        {
            type: String,
            enum: ['veg', 'non-veg']
        }
    ],
    region: [
        {
            type: String,
            enum: ['south-Indian', 'north-Indian', 'chinese', 'bakery','Japenese','Italian']
        }
    ],
    offer: {
        type: String,
    },
    image: {
        type: String,
    },
    vendor: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Vendor'  // ✅ FIX: was 'vendor' (lowercase)
        }
    ],
    products:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }]
});

// ✅ FIX: Prevents OverwriteModelError
const Firm = mongoose.models.Firm || mongoose.model('Firm', firmSchema);

module.exports = Firm;