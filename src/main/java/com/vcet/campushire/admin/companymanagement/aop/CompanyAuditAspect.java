package com.vcet.campushire.admin.companymanagement.aop;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class CompanyAuditAspect {

    @Pointcut(
            "execution(* com.vcet.campushire.admin.companymanagement.controller..*(..))"
    )
    public void controllerMethods() {}

    @Before("controllerMethods()")
    public void auditAction(JoinPoint joinPoint) {

        String methodName = joinPoint.getSignature().getName();

        if (methodName.startsWith("create") ||
                methodName.startsWith("update") ||
                methodName.startsWith("delete") ||
                methodName.startsWith("deactivate")) {

            System.out.println(
                    "[AUDIT] Admin action detected: " + methodName
            );
        }
    }
}
