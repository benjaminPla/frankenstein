import api from './api.js';
import 'dotenv/config'

const PORT = process.env.PORT || 3001

api.listen(PORT, () => console.log(`API on port ${PORT}`))
