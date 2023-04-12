/* eslint-disable no-useless-escape */
import { notification, Select } from 'antd';
const { Option } = Select;

function importAllImageFile(r) {
    const images = [];
    r.keys().map((item) => {
        return images.push({
            name: item.replace('./', '').replace('.png', ''),
            path: r(item),
        });
    });
    return images;
}

export const stringToSlug = (str) => {
    const from = 'àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ',
        to = 'aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy';
    for (let i = 0, l = from.length; i < l; i++) {
        str = str.replace(RegExp(from[i], 'gi'), to[i]);
    }

    str = str
        .toLowerCase()
        .trim()
        .replace(/[,.*+?^${}()|[\]\\]/g, '')
        .split(' ')
        .join('_');
    return str;
};

export const removeAccents = (str) => {
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D');
};

export const nullToString = (value) => {
    if (value == null) return '';
    return value;
};

export function buildQueryString(object) {
    if (typeof object !== 'object') return '';
    const args = [];
    for (const key in object) {
        destructure(key, object[key]);
    }
    return args.join('&');

    function destructure(key, value) {
        if (key && (value || value === false || value === 0)) {
            if (Array.isArray(value)) {
                for (let i = 0; i < value.length; i++) {
                    destructure(key + '[' + i + ']', value[i]);
                }
            } else if (toString(value) === '[object Object]') {
                for (const i in value) {
                    destructure(key + '[' + i + ']', value[i]);
                }
            } else
                args.push(
                    encodeURIComponent(key) +
                        (value != null && value !== '' && value !== undefined ? '=' + encodeURIComponent(value) : ''),
                );
        }
    }
}

export const parseParams = (querystring) => {
    const params = new URLSearchParams(querystring);
    const obj = {};
    for (const key of params.keys()) {
        if (params.getAll(key).length > 1) {
            if (params.get(key) !== 'undefined') obj[key] = params.getAll(key);
        } else {
            if (params.get(key) !== 'undefined') obj[key] = params.get(key);
        }
    }

    return obj;
};

//hiển thị message

export function alertMessage(type, message, description) {
    notification[type]({
        message,
        description,
        duration: 3,
    });
}

export function currencyFormatVND(num) {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

export const selectAfterCurrency = (
    <Select defaultValue="VND" style={{ width: 75 }}>
        <Option value="VND">VNĐ</Option>
        <Option value="DONG/KWH">đồng/kWh</Option>
        {/* <Option value="USD">$</Option> */}
    </Select>
);

//get message mapping error form validate
export function getErrorForm(res, form) {
    const entityError = Object.keys(res.data);

    if (entityError.length) {
        entityError.forEach((err) => {
            console.log('err:  ' + err + res.data[err]);
            return form.setFields([
                {
                    name: err,
                    errors: [res.data[err]],
                },
            ]);
        });
    }
}

//show message mapping data callback api
export function getErrorMessage(res, form) {
    //convert json string

    const arrMesage = JSON.parse(res.message);

    //thay thế chữ cái đầu tiên về chữ thường

    arrMesage.map((item) => {
        item.key = item.key.replace(item.key.charAt(0), item.key.charAt(0).toLocaleLowerCase());
        return item;
    });

    // gán lại key = message ví dụ maDonVi: Mã đơn vị không được bỏ trống

    const newListErr = arrMesage.reduce(
        (acc, x) => [
            ...acc,
            {
                [x.key]: x.value,
            },
        ],
        [],
    );

    // convert nhiều object thành 1 object cho array => {maDonVi: không được bỏ trống, tenDonVi: không được bỏ trống}

    const newObject = Object.assign({}, ...newListErr);

    //lấy key ví dụ {maDonVi: không được bỏ trống, tenDonVi: không được bỏ trống} => ['maDonVi', 'tenDonVi']

    const entityError = Object.keys(newObject);

    if (entityError.length) {
        entityError.forEach((err) => {
            form.scrollToField(err);
            return form.setFields([
                {
                    name: err,
                    errors: [newObject[err]],
                },
            ]);
        });
    }
}

export function formatDateMonth(value) {
    if (value < 10) return '0' + value;
    return value;
}

export const removeUndefinedAttribute = (obj) => {
    const params = {};
    Object.keys(obj).forEach((key) => {
        if (obj[key]) {
            params[key] = obj[key];
        }
        return {};
    });
    return params;
};

//custom columns sort
export function customColumn(columns = [], filters) {
    if (columns.length) {
        columns.forEach((column) => {
            if (column.sorter) {
                column.defaultSortOrder = checkDefaultSortOrderColumn(filters, column.dataIndex);
                column.defaultFilteredValue = checkDefaultFilteredValueColumn(filters, column.dataIndex);
            }
            return null;
        });
    }
    return columns;
}
function checkDefaultSortOrderColumn(filters, columnKey) {
    if (filters?.orderByDesc === columnKey) {
        return 'descend';
    }
    if (filters?.orderBy === columnKey) {
        return 'ascend';
    }
    return null;
}
function checkDefaultFilteredValueColumn(filters, columnKey) {
    if (filters.orderByDesc === columnKey) {
        return filters.orderByDesc;
    }
    if (filters.orderBy === columnKey) {
        return filters.orderBy;
    }
    return null;
}

export function handlePagination(paging, sorter, setFilterConditions) {
    console.log('paging: ' + JSON.stringify(paging));
    let sortKey = 'orderBy';
    let currentKey = 'orderByDesc';
    if (sorter.order === 'descend') {
        sortKey = 'orderByDesc';
        currentKey = 'orderBy';
    } else {
        sortKey = 'orderBy';
        currentKey = 'orderByDesc';
    }
    setFilterConditions((oldState) => ({
        ...oldState,
        pageIndex: paging.current,
        pageSize: paging.pageSize,
        [sortKey]: sorter.order ? sorter.field : undefined,
        [currentKey]: undefined,
    }));
}

//get array after select row key table
export function getSelectedRowKeys(dataSource) {
    const arr = [];
    dataSource.map((item) => {
        if (item.isSelected) {
            arr.push(item.id);
        }
        return null;
    });
    return arr;
}

//scroll top top
export function scrollToTop(ref) {
    if (!ref.current) return;
    ref.current.scrollIntoView({ behavior: 'smooth' });
}

//format YYYY-MM-DD
export function formatYYYYMMDDString(year, month, day) {
    return year + '-' + formatDateMonth(month + 1) + '-' + formatDateMonth(day);
}

//format YYYY-MM
export function formatYYYYMMString(year, month) {
    return year + '-' + formatDateMonth(month + 1);
}

//format dd-mm-yyyy
export function formatDDMMYYYYVN(year, month, day) {
    return formatDateMonth(day) + '-' + formatDateMonth(month + 1) + '-' + year;
}

//format dd/mm/yyyy
export function formatDDMMYYYYString(year, month, day) {
    return formatDateMonth(day) + '/' + formatDateMonth(month + 1) + '/' + year;
}

//get validate error empty and int 15 , .000
export function renderErrorFields(form, value, name, isDecimal) {
    if (isDecimal) validReg(15, 3, value, form, name);
    if (value === undefined || value === '' || value === null || value === 'null') {
        form.setFields([
            {
                name: name,
                errors: ['Không được bỏ trống'],
            },
        ]);
    }
}

export function debounce(func, wait, immediate) {
    // we need to save these in the closure
    let timeout, args, context, timestamp, result;
    return function () {
        context = this;
        args = arguments;
        timestamp = new Date();
        // this is where the magic happens
        // eslint-disable-next-line no-var
        var later = function () {
            // how long ago was the last call
            const last = new Date() - timestamp;
            // if the latest call was less that the wait period ago
            // then we reset the timeout to wait for the difference
            if (last < wait) {
                timeout = setTimeout(later, wait - last);
            }
            // or if not we can null out the timer and run the latest
            else {
                timeout = null;
                if (!immediate) result = func.apply(context, args);
            }
        };
        const callNow = immediate && !timeout;
        // we only need to set the timer now if one isn't already running
        if (!timeout) {
            timeout = setTimeout(later, wait);
        }
        if (callNow) result = func.apply(context, args);
        return result;
    };
}

//validate số 15 số và 3 số thập phân
export const validReg = (max, min, value, form, name) => {
    const floatRegExp = new RegExp(`^[+-]?([0-9]{1,${max}}([.][0-9]{1,${min}})?|[.][0-9]{1,${min}})$`);
    if (value === null || value === '' || value === undefined) {
        form.setFields([
            {
                name: name,
                errors: [`Không được bỏ trống`],
            },
        ]);
    } else if (!floatRegExp.test(value) || value < 0) {
        form.setFields([
            {
                name: name,
                errors: [`Dữ liệu phải thấp hơn hoặc bằng ${max} chữ số và ${min} chữ số thấp phân`],
            },
        ]);
    }
};

//
export const validReg1 = (max, min, value, form, name) => {
    const floatRegExp = new RegExp(`^[+-]?([0-9]{1,${max}}([.][0-9]{1,${min}})?|[.][0-9]{1,${min}})$`);
    if ((!floatRegExp.test(value) && value !== null && value !== '') || parseInt(value) < 0) {
        form.setFields([
            {
                name: name,
                errors: [`Dữ liệu phải thấp hơn hoặc bằng ${max} chữ số và ${min} chữ số thấp phân`],
            },
        ]);
        return false;
    }
    return true;
};

export const checkPermission = (user, code) => {
    if (code && user && user.permission.length && !user.permission.find((value) => value.includes(code))) return false;
    return true;
};

export const checkPath = (menuList, path) => {
    let result = false;
    menuList.data.forEach((menu) => {
        if (menu.path === path && menu.hasPermission) {
            result = true;
        } else {
            if (Array.isArray(menu.subItems) && menu.subItems.length) {
                menu.subItems.forEach((rs) => {
                    if (rs.path === path && rs.hasPermission) {
                        result = true;
                    }
                });
            }
        }
    });
    return result;
};

export const getCert = () => {
    let cert;
    // eslint-disable-next-line no-undef
    const Sign = new SignHubExt();
    Sign.initialize((result) => {
        cert = result;
    });
    return cert;
};

const getTextWidth = (text, font = '14px -apple-system') => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = font;
    const metrics = context.measureText(text);
    return Math.round(metrics.width + 80);
};

export const calculateColumnsWidth = (columns, source, maxWidthPerCell = 500) => {
    const columnsParsed = JSON.parse(JSON.stringify(columns));

    const columnsWithWidth = columnsParsed.map((column) =>
        Object.assign(column, {
            width: getTextWidth(column.key) + 50,
        }),
    );

    // eslint-disable-next-line array-callback-return
    source.map((entry) => {
        // eslint-disable-next-line array-callback-return
        columnsWithWidth.map((column, indexColumn) => {
            const columnWidth = column.width;
            const cellValue = entry[column.key];

            let cellWidth = getTextWidth(cellValue);

            if (cellWidth < columnWidth) cellWidth = columnWidth;

            if (cellWidth > maxWidthPerCell) cellWidth = maxWidthPerCell;

            columnsWithWidth[indexColumn].width = cellWidth;

            let alignment = 'left';

            if (cellValue === parseInt(cellValue, 10)) alignment = 'right';

            columnsWithWidth[indexColumn].align = alignment;
        });
    });

    const tableWidth = columnsWithWidth
        .map((column) => column.width)
        .reduce((a, b) => {
            return a + b;
        });

    return {
        columns: columnsWithWidth,
        source,
        tableWidth,
    };
};

export const renderBodyTable = (props, columns) => {
    return (
        <tr className={props.className}>
            {
                // eslint-disable-next-line
                columns.map((item, idx) => {
                    if (!item.hide) {
                        return props.children[idx];
                    }
                })
            }
        </tr>
    );
};

export const renderHeaderTable = (props, columns) => {
    return (
        <tr>
            {
                // eslint-disable-next-line
                columns.map((item, idx) => {
                    if (!item.hide) return props.children[idx];
                })
            }
        </tr>
    );
};

export const headerWithSummary = (props, noteColumns) => {
    return (
        <thead {...props}>
            {props.children}
            <tr>
                {noteColumns && noteColumns.length > 0
                    ? noteColumns.map((item, index) => (
                          <th
                              className={`ant-table-cell custom-cell ${
                                  item.fixed && !item.last
                                      ? 'ant-table-cell-fix-left'
                                      : item.fixed && item.last
                                      ? ' ant-table-cell-fix-left ant-table-cell-fix-left-last'
                                      : ''
                              }`}
                              key={index}
                              style={
                                  item.fixed
                                      ? {
                                            position: 'sticky',
                                            left: props.children[0].props.stickyOffsets.left[index],
                                            zIndex: 10,
                                        }
                                      : {}
                              }
                          >
                              {item.title}
                          </th>
                      ))
                    : null}
            </tr>
        </thead>
    );
};

export const formatSplitDate = (date, full) => {
    if (full) return date.split('-')[0] + '-' + date.split('-')[1] + '-01';
    else return date.split('-')[0] + '-' + date.split('-')[1];
};

export async function isBase64UrlImage(data) {
    const image = new Image();
    image.src = data;
    return await new Promise((resolve) => {
        image.onload = function () {
            if (image.height === 0 || image.width === 0) {
                resolve(false);
                return;
            }
            resolve(true);
        };
        image.onerror = () => {
            resolve(false);
        };
    });
}

export function jsUcfirst() {
    const string = localStorage.getItem('title-menu');
    if (string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    return '';
}

//123456789 => 123,456,789
export function formatDisplayMoney(value, toFixed) {
    return value.toFixed(toFixed).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function dataURLtoFile(dataurl, filename) {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
}
export const formatDateWithTimezone = (dateISO, withTime = false, withSecond = false) => {
    let format = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    };
    if (withTime) {
        format = { ...format, hour: '2-digit', minute: '2-digit' };
    }
    if (dateISO) {
        const date = new Date(dateISO);
        // const second = date.toLocaleTimeString("vi-VN");
        return date.toLocaleString('sv-SE', withSecond ? undefined : format).replace(',', ' ');
    } else return null;
};

export const formatDateWithTimezoneGB = (dateISO, withTime = false, withSecond = false) => {
    let format = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    };
    if (withTime) {
        format = { ...format, hour: '2-digit', minute: '2-digit' };
    }
    if (dateISO) {
        const date = new Date(dateISO);
        // const second = date.toLocaleTimeString("vi-VN");
        return date.toLocaleString('en-GB', withSecond ? undefined : format).replace(',', ' ');
    } else return null;
};

export const removeDuplicateArr = (arr, field) => {
    debugger;
    const isExist = (arr, x) => {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i][field] === x[field]) {
                return true;
            }
        }
        return false;
    };

    const ans = [];
    arr.forEach((element) => {
        if (!isExist(ans, element)) ans.push(element);
    });
    return ans;
};

export const FILE_TYPES = {
    REMOTE: 'REMOTE',
    LOCAL: 'LOCAL',
    BASE64: 'BASE64',
};

export const getFileType = ({ uri } = {}) => {
    if (!uri) {
        return null;
    }

    if (uri.match(/^https?:\/\//)) {
        return FILE_TYPES.REMOTE;
    }

    if (uri.match(/^bundle-assets:\/\//)) {
        return FILE_TYPES.LOCAL;
    }

    if (uri.match(/^data:application\/pdf;base64/)) {
        return FILE_TYPES.BASE64;
    }

    return null;
};

export function numberWithSpaces(x) {
    if (x) {
        const parts = x.toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        return parts.join('.');
    }
    return x;
}
export function numberWithNoSpaces(x) {
    if (x) {
        const parts = x.toString().replaceAll(' ', '');
        return parts;
    }
    return x;
}

export function isNumber(x) {
    if (typeof x === 'number') {
        return true;
    }
    if (typeof x === 'string' && x.length !== 0 && typeof parseFloat(x) === 'number') {
        return true;
    }
    return false;
}

export function isFloat(x) {
    return x % 1 !== 0;
}

export function roundingNumberAfterDecimal({ number, numberDecimal = 1 }) {
    if (!number && number !== 0) {
        return null;
    }
    const withNumberDecimals = Math.floor(number * (10 * numberDecimal)) / (10 * numberDecimal);
    return +withNumberDecimals;
}

export function checkIndex({ index }) {
    if (index < 0) {
        return false;
    }
    return true;
}
