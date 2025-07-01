const multer = require('multer');
const path = require('path');
const fs = require('fs');
const createError = require('http-errors');

const ensureUploadsDir = () => {
  const basePath = process.env.UPLOADS_DIR || path.join(__dirname, '../../uploads');
  
  try {
    if (!fs.existsSync(basePath)) {
      fs.mkdirSync(basePath, { recursive: true });
      console.log(`📂 Directorio de uploads creado: ${basePath}`);
    }

    const subdirs = ['perfiles', 'carnets', 'licencias', 'vehiculos'];
    subdirs.forEach(dir => {
      const dirPath = path.join(basePath, dir);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
      }
    });

    return basePath;
  } catch (error) {
    console.error(' Error configurando directorios:', error);
    throw createError(500, 'Error al configurar el sistema de almacenamiento');
  }
};

const uploadsBasePath = ensureUploadsDir();

const FIELD_MAPPINGS = {
  fotoPerfil: 'perfiles',
  fotoCarnet: 'carnets',
  licencia: 'licencias',
  fotoCarro: 'vehiculos'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      const folderName = FIELD_MAPPINGS[file.fieldname];
      if (!folderName) {
        return cb(createError(400, `Campo de archivo no válido: ${file.fieldname}`));
      }
      
      const fullPath = path.join(uploadsBasePath, folderName);
      cb(null, fullPath);
    } catch (error) {
      cb(error);
    }
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueName = `file-${Date.now()}-${Math.random().toString(36).substring(2, 9)}${ext}`;
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png'];
  const allowedExtensions = ['.jpg', '.jpeg', '.png'];
  const ext = path.extname(file.originalname).toLowerCase();

  if (!allowedMimeTypes.includes(file.mimetype) || !allowedExtensions.includes(ext)) {
    return cb(createError(400, `Tipo de archivo no permitido para ${file.fieldname}. Solo se aceptan imágenes JPEG o PNG (con extensiones .jpg, .jpeg o .png)`));
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024,
    files: 4 
  }
});

const usuarioUpload = upload.fields([
  { name: 'fotoPerfil', maxCount: 1 },
  { name: 'fotoCarnet', maxCount: 1 },
  { name: 'licencia', maxCount: 1 },
  { name: 'fotoCarro', maxCount: 1 }
]);

module.exports = {
  upload,
  usuarioUpload,
  uploadsBasePath
};