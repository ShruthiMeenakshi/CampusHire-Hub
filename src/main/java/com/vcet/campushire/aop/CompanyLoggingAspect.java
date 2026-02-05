package com.vcet.campushire.aop;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class CompanyLoggingAspect {

    @Pointcut(
            "execution(* com.vcet.campushire.admin.companymanagement.controller..*(..)) || " +
                    "execution(* com.vcet.campushire.admin.companymanagement.service..*(..))"
    )
    public void loggableMethods() {}

    @Before("loggableMethods()")
    public void logBefore(JoinPoint joinPoint) {
        System.out.println(
                "[LOG] Entering method: " +
                        joinPoint.getSignature().toShortString()
        );
    }

    @AfterReturning(pointcut = "loggableMethods()", returning = "result")
    public void logAfter(JoinPoint joinPoint, Object result) {
        System.out.println(
                "[LOG] Exiting method: " +
                        joinPoint.getSignature().toShortString()
        );
    }
}
