import faker from 'faker'
import Mock from 'mockjs'
import moment from 'moment'

faker.setLocale('zh_CN')
const Random = Mock.random()

// 获取随机单词
export const getWord = () => faker.random.word()

// 获取随机数字
export const getNumber = () => faker.random.number()

// 获取数组中随机一个值
export const getArrayElement = (arr) => faker.random.arrayElement(arr)

// 获取地址（街道+城市+国家）
export const getAddress = () => faker.address.streetAddress() + faker.address.city() + faker.address.country()

// 获取价格
export const getPrice = () => faker.commerce.price()

// 获取当前日期
export const getDate = (format = 'YYYY-MM-DD hh:ss:mm') => moment(new Date()).format(format)

// 获取指定大小的图片
export const getImage = (size = '200x200') => Random.image(size)

// 获取邮箱
export const getEmail = () => faker.internet.email()

// 获取头像
export const getAvatar = () => faker.internet.avatar()

// 获取ip地址
export const getIP = () => faker.internet.ip()

// 获取名字全称
export const getName = () => faker.name.findName()

// 获取11位手机号码
export const getPhone = () => `1${(Math.random() * 0xffffff * 1000000).toString(10).slice(0, 10)}`

// 获取UUID
export const getUUID = () => faker.random.uuid()
