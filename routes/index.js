var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/hackhub');

var studentSchema ={
  firstName: String,
    lastName:String,
    school:String,
    enrolled:Boolean,
    age:Number

}

var Student = mongoose.model('Students', studentSchema, 'students');


/* GET home page. */

// router.get('/', function(req, res, next) {
//   Student.find().exec(function(err,doc){
//     res.send(doc);
//
//     })
  //res.render('index', { title: 'Express' });
// });

router.get('/', function(req, res, next) {
  Student.find().exec(function(err,doc){
      res.render('index', { title:"WebDxDDD", name:"Yan", students:doc });

    })

});




router.get('/new', function(req, res, next) {
    res.render('new', {})
});

router.post('/new',function (req,res,next) {
  var newStudent=new Student(req.body)
    newStudent.save(function(err,doc){
      res.redirect('/')
    })

})

// router.get('/:id', function(req, res, next) {
//     Student.findById(req.params.id, function(err, doc) {
//         res.send(doc);
//     });
// });
router.get('/update/:id', function(req, res, next) {
    Student.findById(req.params.id, function(err, doc) {
        res.render('update', {student:doc });

    })

});
router.post('/update/:id', function(req, res, next) {
    Student.update({"_id":req.params.id},req.body, function(err, doc) {
        res.redirect('/')

    })

});
router.get('/delete/:id', function(req, res, next) {
    Student.remove({"_id":req.params.id},function(err,doc){
        res.redirect('/')

    })

});

router.get('/:id', function(req, res, next) {
    Student.findById(req.params.id, function(err, doc) {
        res.render('studentDetail', {student:doc});
    });
});



module.exports = router;
