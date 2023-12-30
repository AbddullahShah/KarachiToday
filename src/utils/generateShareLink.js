import dynamicLinks from '@react-native-firebase/dynamic-links';

export const generateLink = async (id) => {
    try {
        const link = await dynamicLinks().buildShortLink({
            link: `https://khitoday.page.link/?productId=${id}`,
            domainUriPrefix: 'https://khitoday.page.link',
            android: {
                packageName: 'com.karachitoday',
            },
            // ios: {
            //   appStoreId: '123456789',
            //   bundleId: 'com.deepLinkingProjectBundleId',
            // },
        }, dynamicLinks.ShortLinkType.DEFAULT)
        console.log('link:', link)
        return link
    } catch (error) {
        console.log('Generating Link Error:', error)
    }
}

