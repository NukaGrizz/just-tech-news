const { Model, Datatypes } = require('sequelize');
const sequelize = require('../config/connection');

//create our User model
class User extends Model {}

//define table of columns and configuration
User.init(
    {
        //TABLE COLUMN DEFINITIONS GO HERE
        id: {
            //use the special Sequelize Datatypes object provide what type of data it is
            type: Datatypes.INTEGER,
            //this is the equivalent of SQL's 'NOT NULL' option
            allowNull: false,
            //instruct that this is the primary key
            primaryKey: true,
            //turn on auto increment
            autoIncrement: true
        },
        //define a username column
        username: {
            type: Datatypes.STRING,
            allowNull: false
        },
        
        //define email column
        email: {
            type: Datatypes.String,
            allowNull: false,
            //there connot be any duplicate email values in this table
            unique: true,
            //if allowNull is set to false, we can run our data through validators before creating the table data
            validate: {
                isEmail: true
            }
        },
        //define a password column
        password: {
            type: Datatypes.STRING,
            allowNull: false,
            validate: {
                //this mean password must be at least 4 charaters long
                len: [4]
            }
        }
    
    },
    {
        //TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration)

        // pass in our imported sequelize connection (the direct connection to our database)
        sequelize,
        // don't automatically create createdAt/updatedAt timestamp fields
        timestamps: false,
        // don't pluralize name of database table
        freezeTableName: true,
        // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
        underscored: true,
        // make it so our model name stays lowercase in the database
        modelName: 'user'
    }
);

module.exports = User;