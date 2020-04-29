import './index.scss'
import { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { AtButton } from 'taro-ui'

export default class Page extends Component<{}, { info }> {
  componentWillMount() {
    try {
      this.setState({
        info: JSON.parse(decodeURI(this.$router.params.info))
      })
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    const { name, id, sex, birthday, company, photo } = this.state.info
    return (
      <View className='page'>
        <Image
          className='logo'
          src={require('../../assets/images/logo.png')}
          style='acp'
        />
        <View className='title'>工作证</View>
        <Image className='photo' src={photo} mode='aspectFill' />
        <View className='table'>
          {
            this.row('姓名：', name)
          }
          {
            this.row('编号：', id)
          }
          {
            this.row('性别：', sex)
          }
          {
            this.row('生日：', birthday)
          }
          {
            this.row('公司：', company)
          }
        </View>
      </View>
    )
  }

  row(title, content) {
    return <View className='row'>
      <View className='row_title'>{title}</View>
      <View className='row_content'>{content}</View>
    </View>
  }
}