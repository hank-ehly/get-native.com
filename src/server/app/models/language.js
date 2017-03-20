/**
 * language
 * get-native.com
 *
 * Created by henryehly on 2017/02/24.
 */

module.exports = function(sequelize, DataTypes) {
    const Language = sequelize.define('Language', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        }
    }, {
        tableName: 'languages',
        underscored: true
    });

    Language.fetchLanguageCode = function(code) {
        return new Promise((resolve, reject) => {
            if (!code) {
                return resolve('en');
            }

            return Language.findOne({
                where: {code: code},
                attributes: ['code']
            }).then(l => {
                if (l) {
                    resolve(l.code);
                } else {
                    reject({
                        message: 'Validation Failed',
                        errors: [
                            {
                                message: `'${code}' is not a valid language code`,
                                path: 'lang'
                            }
                        ]
                    });
                }
            });
        });
    }

    return Language;
};
