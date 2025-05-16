export default function errorHandler(err, req, res, next) {
   console.error('Um erro ocorreu:', err.message)

   res.status(400).json({ message: err.message})
}