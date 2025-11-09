// test-db.ts
import sequelize from "./src/config/database";

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection established successfully!");
  } catch (err) {
    console.error("❌ Unable to connect to database:", err);
  } finally {
    await sequelize.close();
  }
})();
