

module.exports=(sequelize, Sequelize)=>{


    const Vote = sequelize.define('vote', {
   

        vote_id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            required:true
        },

        post_id:{
            type: Sequelize.INTEGER,
            references:{
                model:'posts',
                key: 'post_id'
               }
        },
      
        votes:{
            type: Sequelize.BOOLEAN,
            allowNull: true,
            required:false
        },
        email:{
           type:Sequelize.STRING(100),
           references:{
            model:'users',
            key: 'email'
           }
        }
    
      }, {
        // options
      });

return Vote;



}

