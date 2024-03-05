const list = {
  navHeader: {
    navItemsLeft: [
      {
        name: 'Trang chủ',
        href: '/',
        icon: null
      },
      {
        name: 'Thư viện của bạn',
        href: '',
        icon: '/svg-export/arrow-down.svg',
        isDropDown: true
      },
      {
        name: 'Lời giải chuyên gia',
        href: '',
        icon: null
      }
    ],
    navItemsRight: [
      {
        type: 'add',
        name: 'Tạo',
        href: '',
        icon: '/svg-export/plus.svg',
        dropDown: [
          {
            name: 'Học phần',
            icon: '/svg-export/file.svg',
            href: '#',
            group: null
          },
          {
            name: 'Thư mục',
            icon: '/svg-export/folder.svg',
            href: '#',
            group: null
          },
          {
            name: 'Lớp',
            icon: '/svg-export/people.svg',
            href: '#',
            group: null
          }
        ]
      },
      {
        type: 'notification',
        name: 'Thông báo',
        href: '',
        icon: '/svg-export/bell.svg',
        dropDown: null
      },
      {
        type: 'profile',
        name: 'Hồ sơ',
        href: '',
        icon: 'https://graph.facebook.com/1104144320046099/picture?type=large',
        dropDown: [
          {
            name: 'Hồ sơ',
            icon: '/svg-export/profile.svg',
            href: '/profile',
            group: 1
          },
          {
            name: 'Cài đặt',
            icon: '/svg-export/settings.svg',
            href: '/settings',
            group: 1
          },
          {
            name: 'Đăng xuất',
            icon: null,
            href: '/auth/logout',
            group: 2
          },
          {
            name: 'Quyền riêng tư',
            icon: null,
            href: '#',
            group: 3
          },
          {
            name: 'Giúp đỡ và phản hồi',
            icon: null,
            href: '#',
            group: 3
          },
          {
            name: 'Nâng cấp',
            icon: null,
            href: '#',
            group: 3
          }
        ]
      }
    ]
  }
}
export default list
