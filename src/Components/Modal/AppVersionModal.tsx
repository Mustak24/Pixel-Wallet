import { CenterModal, Icon, ShowWhen } from '@funtools/native-ui/core';
import { useEffect, useState } from 'react';
import { Linking, View } from 'react-native';
import { TextTheme, ThemeView } from '../../Contexts/ThemeProvider';
import { useVersionHandlers, useVersionStore } from '../../Stores/version';
import { Button, IconButton } from '@funtools/native-ui/components';
import { PLAY_STORE_URL } from '../../../env';

export default function AppUpdateModal() {
  const { whatsNew, isUpdateAvailable, forceUpdate, isRefreshing, latestVersion } = useVersionStore(store => ({
    whatsNew: store.whatsNew,
    isUpdateAvailable: store.isUpdateAvailable,
    forceUpdate: store.forceUpdate,
    latestVersion: store.latestVersion,
    isRefreshing: store.isRefreshing,
  }));

  const { refreshInfo } = useVersionHandlers();

  const [visible, setVisible] = useState(isUpdateAvailable);

  useEffect(() => {
    setVisible(isUpdateAvailable);
  }, [isUpdateAvailable]);

  return (
    <CenterModal
      visible={visible}
      setVisible={setVisible}
    //   backgroundContent={<ParticleBackground color="bg-80" />}
      backdropColor="transparent"
      preventCloseRequest={forceUpdate}
      containerProps={{ color: 'bg-secondary', style: {gap: 20} }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <ThemeView style={{ borderRadius: 12, paddingHorizontal: 12, paddingVertical: 4, alignSelf: 'flex-start' }}>
          <TextTheme style={{ fontWeight: 'bold' }}>{latestVersion}</TextTheme>
          <TextTheme style={{ fontSize: 14 }}>Latest Version</TextTheme>
        </ThemeView>

        <IconButton
          icon={forceUpdate ? 'RotateCw' : 'X'}
          loading={isRefreshing}
          loaderName="LoaderRefresh"
          onPress={forceUpdate ? refreshInfo : () => setVisible(false)}
        />
      </View>

      <ThemeView style={{ alignItems: 'center', justifyContent: 'center', borderRadius: 9999, alignSelf: 'center', padding: 20 }}>
        <Icon name="Rocket" size={50} />
      </ThemeView>

      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <TextTheme style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>
          {forceUpdate ? 'Update is Required' : 'New Update is Available'}
        </TextTheme>

        <TextTheme color="text-secondary" style={{ fontSize: 14, textAlign: 'center' }}>
          <ShowWhen when={!whatsNew} otherwise={whatsNew}>
            Please update the app to the latest version to enjoy new features
            and improvements.
          </ShowWhen>
        </TextTheme>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Button
          style={{ flex: 1 }}
          title="Update Now"
          color="primary"
          variant="solid"
          onPress={() => Linking.openURL(PLAY_STORE_URL)}
        />
      </View>
    </CenterModal>
  );
}