export const handleUpload = (req, res, upload) => {
    upload.single('file')(req, res, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Nie udało się załadować zdjęcia' })
        }
        else {
            return res.status(200).json({
                message: 'File uploaded successfully',
                url: `/uploads/${req.file.originalname}`
            });
        }
    });
    // dodac obsluge bledow
}