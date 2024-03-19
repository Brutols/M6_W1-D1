// {isActive: true} => 51 risorse trovate
// {age: {$gt: 26}} => 54 risorse trovate
// {age: {$gt: 26, $lte: 30}} => 19 risorse trovate
// {eyeColor: {$in: ["brown", "blue"]}} => 66 risorse trovate
// {eyeColor: {$not: {$eq: "green"}}} => 66 risorse trovate
// {eyeColor: {$nin: ["green", "blue"]}} => 35 risorse trovate

// in filter: {company: "FITCORE"} => 1 risorsa trovata
// in options/project: {email: 1, _id: 0} => email: "victoria.solis@fitcore.biz"