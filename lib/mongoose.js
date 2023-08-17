import mongoose from 'mongoose';

// export function mongooseConnect() {
//   if(mongoose.connection.readyState === 1){
//     return mongoose.connection.asPromise();
//   } else {
//     const uri = process.env.MONGODB_URI;
//     return mongoose.connect(uri);
//   }
// }

export async function mongooseConnect() {
  if (mongoose.connection.readyState !== 1) {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI not defined in environment.");
    }
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }
}