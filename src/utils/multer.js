import multer from 'multer'

export const multerStorageLocal = multer.diskStorage({
  destination: 'public/assets',
  filename: (req, file, cb) => {
    const filenameArray = file.originalname.split('.');

    const format = filenameArray.pop();

    const filename = filenameArray.join('-').replace(/ /gi, '-')

    cb(null, filename + '-' + Date.now() + '.' + format)
  }
})

export default multer