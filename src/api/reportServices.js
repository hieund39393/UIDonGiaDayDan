import * as request from '../utils/request';
import { authGetData } from '~/utils/request';
import { Endpoint } from '~/utils/endpoint';
export const chiTietInOut = async (params) => {
    authGetData({
        url: `${Endpoint.LIST_POSITION}`,
        // setLoading,
        onSuccess: (res) => {
            if (res.statusCode === 200) {
                return res.data;
            }
        },
    });

    // try {
    //     console.log('params' + params);
    //     const res = await request.get(`/reportTimekeeping?${params}`);
    //     return res.data;
    // } catch (error) {
    //     console.log(error);
    // }
};

export const downLoadFile = async (params, setLoading) => {
    setLoading(true);
    try {
        console.log('params : ' + params);
        const res = await request.downLoadFile(`/reportTimekeeping?${params}`);
        console.log('resAPI' + res);
        console.log('resAPIData' + res.data);
        return res;
    } catch (error) {
        console.log('error' + error);
    } finally {
        setLoading(false);
    }
};
