/**
 * Created by zhoujialin on 2016/7/1.
 */


module.exports = function(str){
    //g��ȫ���ַ�����ƥ����@��ͷw��ʾ��Сд��ĸa-z������0-9�ַ���*��ʾ����ƥ��ܶ��
    return str.match(/@[0-9a-zA-Z\u4e00-\u9faf]*(?=\s)/g).map(nickname => nickname.split('@')[1] );
};
