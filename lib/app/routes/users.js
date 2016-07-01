var express = require('express');
var router = express.Router();
var domain = require('../../core/index');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//�û�ע��
router.post('/reg', function(req, res){
    var loginname = req.body.loginname;
    var email = req.body.email;
    var password = req.body.password;
    var confirm = req.body.confirm;

    if(password === confirm){
        //���������
        domain.create('User', {loginname, email, password}).then(function(json){
            req.session.loginer = json; //�û���Ϣ���浽session
            res.send({state:'success', id:json.id});
        }).catch(function(error){
            res.send({state:'error', error});
        });
    }else{
        res.send({state:'error', error:{password:'������ȷ�����벻��'}});
    }
});
//�û���¼
router.post('/login', function(req, res){
    var loginname = req.body.loginname;
    var password = req.body.password;
    var err = {
        state: 'error',
        loginname: '��½���������������������.'
    };
    var col = domain.readDB.collection('User');
    col.findOne({loginname}, function(err, user){
        if(user){
            if(user.password === password){
                req.session.loginer = user;
                res.send({
                    state:'success',
                    id: user.id
                });
            }else{
                res.send(err);
            }
        }else{
            res.send(err);
        }
    });
});

// ������������û��Ƿ��¼
function validateLogined(req, res, next){
    if(req.session.loginer){
        next();
    }else{
        res.send({
            state:'error',
            isLogined:false
        });
    }
}

//��������
router.post('/update_pwd', validateLogined, function(req, res){
    var password = req.body.password;
    var id = req.session.loginer.id;
    domain.call(`User.${id}.updatePwd`, {password}, function(err){
        if(err){
            err.state = 'error';
            res.send(err);
        }else{
            res.send({
                state:'success'
            });
        }
    });
});
//�����ǳ�
router.post('/update_nick', validateLogined, function(req, res){
    var nickname = req.body.nickname;
    var id = req.session.loginer.id;
    domain.call(`User.${id}.update`, {nickname}, function(err){
        if(err){
            err.state = 'error';
            res.send(err);
        }else{
            res.send({state: 'success'});
        }
    });
});
//����email
router.post('/update_email', validateLogined, function(req, res){
    var email = req.body.email;
    var id = req.session.loginer.id;
    domain.call(`User.${id}.update`, {email}, function(err){
        if(err){
            err.state = 'error';
            res.send(err);
        }else{
            res.send({state: 'success'});
        }
    });
});






module.exports = router;
























