import Taro, { Component } from '@tarojs/taro'
import { View, Picker } from '@tarojs/components'
import './index.scss'
import { AtForm, AtInput, AtButton, AtImagePicker, AtList, AtListItem } from 'taro-ui'

export interface PageFormState {
  name: string
  id: string
  sex: number
  company: string
  birthday: string
  imgs: { url: string }[]
  [key: string]: string | number
}

export default class Index extends Component<{}, PageFormState> {

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  public config: Taro.PageConfig = {
    navigationBarTitleText: '电子员工证'
  }

  public constructor() {
    super(...arguments)
    this.state = {
      name: '',
      id: '',
      sex: 0,
      birthday: '',
      company: '',
      imgs: []
    }
  }

  private handleChange(stateName: string, value: any): void {
    this.setState({
      [stateName]: value
    })
  }

  private handleSex(e) {
    this.setState({
      sex: e.detail.value
    })
  }

  private handleSubmit(): void {
    const { name, id, birthday, company, imgs: files, sex } = this.state
    if (!name) {
      Taro.showToast({
        title: '请填写姓名',
        icon: 'none'
      })
    } else if (!id) {
      Taro.showToast({
        title: '请填写员工编号',
        icon: 'none'
      })
    } else if (!birthday) {
      Taro.showToast({
        title: '请填写出生日期',
        icon: 'none'
      })
    } else if (!company) {
      Taro.showToast({
        title: '请填写公司名称',
        icon: 'none'
      })
    } else if (files.length === 0) {
      Taro.showToast({
        title: '请添加照片',
        icon: 'none'
      })
    } else {
      const data = {
        name,
        id,
        birthday,
        company,
        sex: sex === 0 ? '男' : '女',
        photo: files[0].url
      }
      let info = encodeURI(JSON.stringify(data));
      Taro.navigateTo({
        url: '/pages/card/index?info=' + info
      })
    }
  }

  private onDateChange(e) {
    console.log(e)
    this.setState({
      birthday: e.detail.value
    })
  }

  getNowFormatDay(nowDate?) {
    var char = "-";
    if (nowDate == null) {
      nowDate = new Date();
    }
    var day = nowDate.getDate();
    var month = nowDate.getMonth() + 1;//注意月份需要+1
    var year = nowDate.getFullYear();
    //补全0，并拼接
    var result = year + char + this.completeDate(month) + char + this.completeDate(day);
    console.log(result)
    return result
  }

  completeDate(value) {
    return value < 10 ? "0" + value : value;
  }

  handlePhoto(files) {
    this.setState({
      imgs: files
    })
  }

  public render(): JSX.Element {
    return (
      <View className='page'>
        <View className='doc-body'>
          {/* 表单提交与重置 */}
          <View className='panel'>
            <View className='panel__title'>请填写员工证信息</View>
            <View className='panel__content no-padding'>
              <View className='component-item'>
                <AtForm
                  onSubmit={this.handleSubmit.bind(this)}
                >
                  <AtInput
                    name='name'
                    title='姓名'
                    type='text'
                    placeholder='请输入姓名'
                    value={this.state.name}
                    onChange={this.handleChange.bind(this, 'name')}
                  />
                  <Picker mode='selector' range={['男', '女']} onChange={this.handleSex.bind(this)} value={this.state.sex}>
                    <AtList hasBorder={false}>
                      <AtListItem
                        title='性别'
                        extraText={this.state.sex === 0 ? '男' : '女'}
                      />
                    </AtList>
                  </Picker>
                  <AtInput
                    name='id'
                    title='员工编号'
                    type='text'
                    placeholder='请输入员工编号'
                    value={this.state.id}
                    onChange={this.handleChange.bind(this, 'id')}
                  />
                  <AtInput
                    name='company'
                    title='公司'
                    type='text'
                    placeholder='请输入公司名称'
                    value={this.state.company}
                    onChange={this.handleChange.bind(this, 'company')}
                  />
                  {/* <AtCheckbox
                    options={[
                      { label: 'iPhone X', value: 'iPhone X' },
                      { label: 'HUAWEI P20', value: 'HUAWEI P20' }
                    ]}
                    selectedList={this.state.value3}
                    onChange={this.handleChange.bind(this, 'value3')}
                  /> */}
                  <Picker
                    mode='date'
                    onChange={this.onDateChange.bind(this)}
                    value=''
                    end={this.getNowFormatDay()}
                  >
                    <AtList hasBorder={false}>
                      <AtListItem title='出生日期' extraText={this.state.birthday} />
                      <AtListItem hasBorder={false} title='证件照片' />
                    </AtList>
                  </Picker>
                  <AtImagePicker
                    files={this.state.imgs}
                    onChange={this.handlePhoto.bind(this)}
                    count={1}
                    showAddBtn={this.state.imgs.length === 0}
                  />
                  <View className='button'>
                    <AtButton type='primary' formType='submit'>提交</AtButton>
                  </View>
                </AtForm>
              </View>
            </View>
          </View>
        </View>
      </View >
    )
  }
}
