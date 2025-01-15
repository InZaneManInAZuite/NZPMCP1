package com.nzpmcp2.demo.config;

import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import com.google.common.collect.Sets;

public enum UserRoles {
    ADMIN(Sets.newHashSet(
            Permissions.USER_GET_ALL,
            Permissions.USER_GET_BY_ID,
            Permissions.USER_CREATE,
            Permissions.USER_UPDATE,
            Permissions.USER_DELETE,
            Permissions.EVENT_GET_ALL,
            Permissions.EVENT_GET_BY_ID,
            Permissions.EVENT_CREATE,
            Permissions.EVENT_UPDATE,
            Permissions.EVENT_DELETE
    )),
    USER(Sets.newHashSet(
            Permissions.USER_UPDATE,
            Permissions.USER_DELETE,
            Permissions.EVENT_GET_ALL,
            Permissions.EVENT_GET_BY_ID
    )),
    VISITOR(Sets.newHashSet(
            Permissions.USER_CREATE,
            Permissions.EVENT_GET_ALL,
            Permissions.EVENT_GET_BY_ID
    )),
    BUILDER(Sets.newHashSet(
            Permissions.COMPETITION_GET_ALL,
            Permissions.COMPETITION_CREATE,
            Permissions.COMPETITION_UPDATE,
            Permissions.COMPETITION_DELETE,
            Permissions.QUESTION_GET_ALL,
            Permissions.QUESTION_CREATE,
            Permissions.QUESTION_UPDATE,
            Permissions.COMPETITION_DELETE
    ));

    private final Set<Permissions> permissions;

    UserRoles(Set<Permissions> permissions) {
        this.permissions = permissions;
    }

    public Set<Permissions> getPermissions() {
        return permissions;
    }

    public Set<SimpleGrantedAuthority> getGrantedAuthorities() {
        Set<SimpleGrantedAuthority> permissions = getPermissions().stream()
                .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
                .collect(Collectors.toSet());
        permissions.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
        return permissions;
    }
}
