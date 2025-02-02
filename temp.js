const { Sequelize } = require('sequelize');
const stageRoutes = require('./src/routes/stageRoutes');
const roleRoutes = require('./src/routes/roleRoutes');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// Connect to PostgreSQL with Sequelize
const sequelize = new Sequelize(process.env.POSTGRES_URI, {
  dialect: 'postgres',
  logging: false,
});

sequelize.authenticate()
  .then(() => console.log('PostgreSQL Connected'))
  .catch(err => console.log('Database Error:', err));

// Routes
app.use('/api/stages', stageRoutes);
app.use('/api/roles', roleRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(Server running on port ${PORT}));
