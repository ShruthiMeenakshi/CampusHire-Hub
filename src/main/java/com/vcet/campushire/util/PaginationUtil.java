package com.vcet.campushire.util;

public class PaginationUtil {

    public static int getPage(int page) {
        return page < 0 ? 0 : page;
    }

    public static int getSize(int size) {
        return size <= 0 ? 10 : size;
    }
}
